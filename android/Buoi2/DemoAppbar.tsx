import { Alert, View } from "react-native";
import { Appbar } from "react-native-paper";

const DemoAppbar = ()=>{
    const goBack =() => Alert.alert("Go Back")
    const search =() => Alert.alert("Search")

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress ={goBack} />
            <Appbar.Action   icon= "magnify" onPress={search} />
            
        </Appbar.Header>
    );
};
export default DemoAppbar;