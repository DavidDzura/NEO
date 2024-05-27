import { useState } from 'react';
import axios from 'axios';
import {Header} from "./components/Header.tsx";
import DatePicker from "./components/DatePicker.tsx";
import Table, {NeoData} from "./components/Table.tsx";

const NeoPage = () => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [neoData, setNeoData] = useState<NeoData[]>([]);
	const [error, setError] = useState<string | null>(null);

	const fetchNeoData = async () => {
		if (!startDate || !endDate) { 
			setError('Please select both start date and end date');
			return;
		}

		const startDateObj = new Date(startDate);
		const endDateObj = new Date(endDate);
		const timeDifference = endDateObj.getTime() - startDateObj.getTime();
		const dayDifference = timeDifference / (1000 * 3600 * 24);
		if (dayDifference > 7) {
			setError('Date range must be 7 days or less');
			return;
		}

		setError(null);

		try {
			const response = await axios.get('http://localhost:5000/api/neo', {
				params: { start_date: startDate, end_date: endDate },
			});
			setNeoData(response.data);
		} catch (error) {
			console.error('Error fetching NEO data:', error);
			setError('Error fetching NEO data. Please try again later.');
		}
	};

	return (
		<div className='mx-auto w-full'>
			<Header/>
			<DatePicker
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
				fetchNeoData={fetchNeoData}
			/>
			{error && <p className='text-red-500 text-lg text-center mb-3'>{error}</p>}
			{neoData.length ? <Table neoData={neoData}/> : ''}
		</div>
	);
};

export default NeoPage;
