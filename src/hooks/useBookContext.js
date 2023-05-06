import { useContext } from 'react';
import { BookContext } from '../context/books';

export default function useBookContext() {
  return useContext(BookContext)
}