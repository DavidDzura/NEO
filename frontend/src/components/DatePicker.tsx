import {Spinner} from "./Spinner.tsx";
import {useState} from "react";

interface DatePickerProps {
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    fetchNeoData: () => void;
}

const DatePicker = ({endDate, setEndDate, startDate, setStartDate, fetchNeoData}: DatePickerProps) => {

	const [isLoading, setIsLoading] = useState(false);

	const handleFetchData = async () => {
		setIsLoading(true);
		try {
			await fetchNeoData();
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col sm:flex-row justify-evenly max-w-[600px] mx-auto my-3'>
			<div className='flex gap-x-1 sm:gap-x-3 mx-auto'>
				<input
					className='px-2 bg-black/80 rounded-xl min-h-12 w-36 md:w-42 border-sky-900 border-2'
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<p className='my-auto'>-</p>
				<input
					className='px-2 bg-black/80 rounded-xl min-h-12 w-36 md:w-42 border-sky-900 border-2'
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
			<button className='w-32 mt-3 sm:mt-0 mx-auto' onClick={handleFetchData} disabled={isLoading}>
				{isLoading ? <Spinner/> : 'Fetch NEOs'}
			</button>
		</div>

	);
};

export default DatePicker;