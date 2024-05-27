interface TableProps {
    neoData: NeoData[];
}

export interface NeoData {
    name: string;
    size: number;
    closest_approach_time: string;
    miss_distance: string;
}

const Table = ({neoData}: TableProps) => {
	return (
		<div>
			<SmallTable neoData={neoData}/>
			<BigTable neoData={neoData}/>
		</div>
	);
};

const BigTable = ({neoData}: TableProps) => (
	<div className='hidden md:block mx-auto max-w-[900px]'>
		<div className="max-w-[900px] block overflow-hidden border text-center mx-2 sm:mx-5">
			<table className='mx-auto w-full border'>
				<thead>
					<tr className='bg-[#150226]/40'>
						<th className='p-2 w-1/4'>Name</th>
						<th className='p-2 w-1/4'>Size (km)</th>
						<th className='p-2 w-1/4'>Closest Approach Time</th>
						<th className='p-2 w-1/4'>Miss Distance (km)</th>
					</tr>
				</thead>
			</table>
			<div className="max-h-[65vh] overflow-auto">
				<table className="w-full">
					<tbody className="text-center">
						{neoData.map((neo, index) => (
							<tr key={index} className="border-b">
								<td className="p-1 w-1/4">{neo.name}</td>
								<td className="p-1 w-1/4">{neo.size}</td>
								<td className="p-1 w-1/4">{neo.closest_approach_time.replaceAll('-', ' ')}</td>
								<td className="p-1 w-1/4">{neo.miss_distance}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
)

const SmallTable = ({neoData}: TableProps) => (
	<div className='block md:hidden w-full max-h-[65vh] overflow-auto my-5'>
		{neoData.map((neo, index) => (
			<div className='mx-5 border-2 rounded-lg mb-2 p-2'>
				<div className='flex flex-col'>
					<div key={index} className='justify-between'>
						<div className='flex mb-1 gap-x-1'>
							<h4 className='w-1/2'>Name</h4>
							<p className='w-1/2'>{neo.name}</p>
						</div>
						<div className='flex mb-1 gap-x-1'>
							<h4 className='w-1/2'>Size (km)</h4>
							<p className='w-1/2'>{neo.size}</p>
						</div>
						<div className='flex mb-1 gap-x-1'>
							<h4 className='w-1/2'>Closest Approach Time</h4>
							<p className='w-1/2'>{neo.closest_approach_time}</p>
						</div>
						<div className='flex mb-1 gap-x-1'>
							<h4 className='w-1/2'>Miss Distance (km)</h4>
							<p className='w-1/2 break-all'>{neo.miss_distance}</p>
						</div>
					</div>
				</div>
			</div>
		))}
	</div>
)


export default Table;