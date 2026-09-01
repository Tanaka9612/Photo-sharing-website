import { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import './App.css'
import Home from './components/Home'
import SplashPage from'./components/SplashPage'
import Login from './components/Login'
import Signup from './components/SignUp'
import NotFound from './components/NotFound'

const posts = [
  {
    id: 1,
    username: "@sarah",
    caption: "A beautiful moment captured today.",
    image: "/images/demo-photo.jpg",
    comments: [
      {
        username: "@john",
        text: "This photo looks amazing!"
      },
      {
        username: "@amy",
        text: "I love the lighting in this."
      },
      {
        username: "@michael",
        text: "Great shot!"
      }
    ]
  },

  {
    id: 2,
    username: "@john",
    caption: "Sometimes the simplest moments make the best photos.",
    image: "/images/demo-photo.jpg",
    comments: [
      {
        username: "@sarah",
        text: "This is such a nice capture."
      },
      {
        username: "@amy",
        text: "Really beautiful!"
      },
      {
        username: "@michael",
        text: "The composition is great."
      }
    ]
  },

  {
    id: 3,
    username: "@amy",
    caption: "Exploring new places and seeing things differently.",
    image: "/images/demo-photo.jpg",
    comments: [
      {
        username: "@john",
        text: "Where was this taken?"
      },
      {
        username: "@sarah",
        text: "Such a beautiful view!"
      },
      {
        username: "@michael",
        text: "I need to visit this place."
      }
    ]
  },

  {
    id: 4,
    username: "@michael",
    caption: "Photography is about capturing moments that words cannot describe.",
    image: "/images/demo-photo.jpg",
    comments: [
      {
        username: "@amy",
        text: "I completely agree!"
      },
      {
        username: "@sarah",
        text: "Beautifully said."
      },
      {
        username: "@john",
        text: "And this photo proves it."
      }
    ]
  },

  {
    id: 5,
    username: "@lisa",
    caption: "Another day, another photograph worth remembering.",
    image: "/images/demo-photo.jpg",
    comments: [
      {
        username: "@michael",
        text: "Amazing photo!"
      },
      {
        username: "@john",
        text: "The details are incredible."
      },
      {
        username: "@sarah",
        text: "Love this one ❤️"
      }
    ]
  }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
