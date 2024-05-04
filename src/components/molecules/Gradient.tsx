import { LinearGradient } from "expo-linear-gradient";
import { gradient } from "../../utils/constants";

export default function Gradient(){
    return (
      <LinearGradient
        colors={[gradient, 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          bottom: 0,
        }}
      />
    )
}