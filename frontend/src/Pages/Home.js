import * as React from 'react';
import Navbar from '../Components/Navbar';
import BookTable from '../Components/BookTable';
import {useParams } from "react-router-dom";

export default function Home() {
  let param=useParams()
  return (
    <div>
    <Navbar data={param.val}/>
    <BookTable data={param.val}/>
    </div>
  );
}