const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary users
const users = [
    {
        id: 1,
        email: "sarah@gmail.com",
        password: "1234"
    },
    {
        id: 2,
        email: "john@gmail.com",
        password: "1234"
    }
];

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            email: user.email
        }
    });
});
app.post("/register", (req, res) => {
    const {email, password, password2 } = req.body;

    if(password != password2){
        return res.status(401).json({
            message: "Passwords do not match"
        })
    }
    else{
        const newUser = {
            id: users.length + 1,
            email,
            password,
            password2
        };

        users.push(newUser);
        console.log(users);
        res.json({
            message: "Registration successful",
            user: newUser
        });
    }
    
});

// Test endpoint
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});



