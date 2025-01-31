import { QRCodeSVG } from 'qrcode.react';
import { useHomeScreenBehaviour } from './behaviour';
import { Render } from '@renderer/components/Render';
import {
	Center,
	FullScreenContainer,
	Header,
	InstructionText,
	LoadingMessage,
	QrCodeContainer,
	Subtitle,
	Title,
} from './styles';
import LoadingRing from '@renderer/components/Layout/LoadingRing';

const Home = () => {
	const { qrCodeString } = useHomeScreenBehaviour();

	return (
		<div>
			<FullScreenContainer>
				<Header>
					<Title>Welcome to Kozz-IWAC!</Title>
					<Subtitle>The improved whatsapp web client!</Subtitle>
				</Header>

				<Center>
					<Render when={!!qrCodeString}>
						<InstructionText>
							Please scan the QR-Code to authenticate with WhatsApp
						</InstructionText>
						<QrCodeContainer>
							<QRCodeSVG value={qrCodeString!} size={480} />
						</QrCodeContainer>
					</Render>

					<Render when={!qrCodeString}>
						<QrCodeContainer>
							<LoadingRing />
							<LoadingMessage>Loading WhatsApp...</LoadingMessage>
						</QrCodeContainer>
					</Render>
				</Center>
			</FullScreenContainer>
		</div>
	);
};

export default Home;
