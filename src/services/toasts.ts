import toast from 'react-hot-toast';

export const noMovies = () => toast.error('No movies found for your request.');

export const badRequest = () => toast.error('Something went wrong');

export const emptyValue = () => toast.error('Please enter your search query.');
