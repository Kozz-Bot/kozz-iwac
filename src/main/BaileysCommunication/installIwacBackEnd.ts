import { exec } from 'child_process';
import { BrowserWindow } from 'electron';

type StdoutHandler = (data: any) => void;

export const executeBashCommand = (
	command: string,
	args: string[] = [],
	handleStdout: StdoutHandler = console.log
) => {
	const process = exec(`${command} ${args.join(' ')}`);

	console.log({ process });
	if (process.stdout) {
		process.stdout.on('data', data => {
			console.log(data);
			if (typeof data === 'string') {
				data.split('\\n').forEach(line => {
					handleStdout(data);
				});
			} else {
				handleStdout(data);
			}
		});
	}

	if (process.stderr) {
		process.stderr.on('data', data => {
			console.error(`stderr: ${data}`);
		});
	}

	process.on('close', code => {
		console.log(`child process exited with code ${code}`);
	});
};

export const installIwacBackEnd = (window: BrowserWindow) => {
	const onData = (data: any) => {
		window.webContents.send('iwacData', data);
	};

	executeBashCommand(
		'curl -s gramont.ddns.net/cdn/file/public/install-kozz-iwac.sh | bash',
		[],
		onData
	);
};
