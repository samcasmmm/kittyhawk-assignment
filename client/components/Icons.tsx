import { icons, LucideProps } from 'lucide-react-native';
import { TextStyle } from 'react-native';

interface IconProps extends LucideProps {
  name: string;
  color: string;
  size: number;
  style?: TextStyle | any;
}
const AppIcons = ({ name, color = '#000', size = 18, style }: IconProps) => {
  const LucideIcon = (icons as Record<string, any>)[name];

  return <LucideIcon color={color} size={size} style={style} />;
};

export default AppIcons;
