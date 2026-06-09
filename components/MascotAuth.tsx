import { Text, View, Image } from "react-native";
import { images } from "@/constants/images";

export default function MascotAuth() {
  return (
    <View className="w-full items-center justify-center h-52  relative overflow-visible z-10">
      <Image
        source={images.mascotAuth}
        className=" size-full  "
        resizeMode="contain"
      />
      <Text className="absolute left-1/4 top-10 text-sunburst text-xl">
        {"✦"}
      </Text>
      <Text className="absolute right-1/4 top-12 text-electric-blue text-xl">
        {"✦"}
      </Text>
      <Text className="absolute right-1/3 bottom-16 text-sunburst text-sm">
        {"✦"}
      </Text>
    </View>
  );
}
