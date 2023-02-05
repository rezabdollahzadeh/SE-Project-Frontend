import InputField from "components/InputField";
import Loading from "components/Loading";
import { useGetApi } from "hooks/useApi";
import { Refresh } from "iconsax-react";
import Log from "model/Log";
import { useEffect, useState } from "react";

interface LogLineProps {
	lineNumber: number;
	logText: string;
}

function LogLine({ logText }: LogLineProps) {
	return (
		<div
			className="w-full flex font-mono font-extralight p-2 border-b-2 cursor-pointer duration-200 hover:bg-gray-100"
			onClick={() => {
				navigator.clipboard.writeText(logText);
			}}
		>
			<p className="w-full break-words">{logText}</p>
		</div>
	);
}

export default function SystemLog() {
	const [log, loadLogs] = useGetApi<Log>("https://localhost:5000/admin/log");
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		loadLogs({ lines: 10 });
	}, []);

	return (
		<div className="max-h-full">
			<div className="p-3 bg-gray-200 border-b-2 border-gray-300 flex justify-between items-center">
				<p className="font-medium">
					Updated at:{" "}
					<span className="text-sm italic">
						{log.loading
							? "Loading..."
							: "data" in log
							? log.data.update
							: "An Error Occured"}
					</span>
				</p>

				<input
					placeholder="Search"
					className="w-1/4 py-1 px-3 rounded-lg border border-gray-300 duration-200 outline-none focus:border-blue"
					onChange={(e) => setSearchText(e.target.value)}
				/>

				<Refresh
					className="cursor-pointer hover:animate-spin"
					onClick={() => loadLogs({ lines: 10 })}
				/>
			</div>
			<div className="max-h-full">
				{log.loading ? (
					<Loading className="mx-auto p-8" />
				) : "data" in log ? (
					log.data.lines
						.filter(
							(log) =>
								searchText === "" || log.includes(searchText)
						)
						.map((log, i) => (
							<LogLine key={i} lineNumber={i + 1} logText={log} />
						))
				) : (
					<p className="w-full text-center text-medium text-lg p-8">
						Unable to load
					</p>
				)}
			</div>
		</div>
	);
}
