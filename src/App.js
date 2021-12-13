import React, {Fragment, useEffect, useState} from 'react'
import Sign from './Sign'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import axios from 'axios'
import Expenses from './components/Expenses';
import TodayMeal from './components/TodayMeal';
import ProtectedRoute from './ProtectedRoute';

import './components/App.css'
import Member from './components/Member';
import Profile from './components/Profile';
import Schedule from './components/Schedule';
import Statistics from './components/Statistics'
import MemberDelete from './components/MemberDelete';


function App() {
    
    return (
        
            <Router>
                <Fragment>
                <Routes>
                
                    <Route path="/" exact
                    element={<Sign />}
                    />
                    <Route  path='/home' element={<ProtectedRoute/>}>
                    <Route path="/home"
                    element={<Home />}
                    />
                    </Route>
 
                    <Route  path='/meals' element={<ProtectedRoute/>}>
                    <Route path="/meals"
                    element={<TodayMeal  />}
                    />
                    </Route>

                    <Route  path='/expenses' element={<ProtectedRoute/>}>
                    <Route path="/expenses"
                    element={<Expenses/>}
                    />
                    </Route>

                    <Route  path='/members' element={<ProtectedRoute/>}>
                    <Route path="/members"
                    element={<Member/>}
                    />
                    </Route>

                    <Route  path='/profile' element={<ProtectedRoute/>}>
                    <Route path="/profile"
                    element={<Profile/>}
                    />
                    </Route>

                    <Route  path='/schedule' element={<ProtectedRoute/>}>
                    <Route path="/schedule"
                    element={<Schedule/>}
                    />
                    </Route>

                    <Route  path='/statistics' element={<ProtectedRoute/>}>
                    <Route path="/statistics"
                    element={<Statistics/>}
                    />
                    </Route>

                    <Route  path='/deletemember' element={<ProtectedRoute/>}>
                    <Route path="/deletemember"
                    element={<MemberDelete/>}
                    />
                    </Route>

                </Routes>
                </Fragment>
            </Router>
            

        
    )
}

export default App;
