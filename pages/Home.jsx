import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5555/books");
      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        return;
      }
      if (response.ok) {
       
        setBooks(result.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setLoading(true);
    getData();
    /*axios.get('http://localhost:5555/books')
      .then((res)=>{
        setBooks(res.data)
        setLoading(false)
      })
      .catch((err)=>{console.log(err)
        setLoading(false)
      })
    */
  }, []);
 
  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-5xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md-hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, index) => {
              return (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-900 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-900 rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-slate-900 rounded-md text-center">
                    {book.author}
                  </td>
                  <td className="border border-slate-900 rounded-md text-center">
                    {book.publishYear}
                  </td>
                  <td className="border border-slate-900 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`books/delete/${book._id}`}>
                        <MdOutlineDelete  className="text-2xl text-red-700" />
                        </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
