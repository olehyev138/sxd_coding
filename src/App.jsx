import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Gallery from './components/gallery/Gallery';

function App() {
	return (
		<div>
			<Routes>
				<Route exact path="/" element={<Home/>}/>
				<Route path="*" element={<Home/>}/>
				<Route path="/gallery/:id" element={<Gallery/>}/>
			</Routes>
		</div>
	)
}

export default App