import Image from 'react-bootstrap/Image'
import { PLACEHOLDER_IMAGE } from 'src/constants';

export const Avatar = ({ url, height = 50, width = 50 }: { url?: string; height?: number; width?: number; }) => {
	return (
		<Image roundedCircle width={width} height={height} src={url || PLACEHOLDER_IMAGE}></Image>
	)
}