const express = require('express');
const User = require('./models/user.js');
const sequelize = require("./sequelize");
const cors = require('cors')

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
sequelize.sync()
.then(()=>{
    console.log('Database synchronized successfully');
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
    });
})
.catch((err)=>{
    console.error('Error syncing database',err);
})
//post
app.post('/users',async(req,res)=>{
    try{
        const{username,email}= req.body;
        const newUser = await User.create({username,email});
        res.json(newUser);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal server eror'})
    }
});

app.get("/users",async(req,res)=>{
    try{
        const allUsers = await User.findAll();
        res.json(allUsers);
    }
    catch(err){
        console.log(err)
    }
})
// Update user by ID
app.put('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { email } = req.body;
  
      // Find the user in the database by ID
      const user = await User.findByPk(userId);
  
      if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's email
      user.email = email;
      await user.save();
  
      // Respond with the updated user
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.delete('/users/:id',async(req,res)=>{
    try{
        const userID = req.params.id;
        const deletedUser = await User.destroy({ where: { id: userID }, returning: true });
       if(!deletedUser){
        return res.status(404).json({error:"User not found"});
       }
   
    }
    catch(error){
        res.status(500).json({error:"internal server error"})
    }
});