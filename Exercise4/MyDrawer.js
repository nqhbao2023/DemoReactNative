import HomeScreen from "../Exercise4/HomeScreen"
import Profile from "../Exercise4/Profile"
import CustomDrawerBar from "../Exercise4/CustomDrawerBar"
import Ex4_DetailScreen from "../Exercise4/Ex4_DetailScreen"
import { createDrawerNavigator } from "@react-navigation/drawer"

const Drawer = createDrawerNavigator()
    const MyDrawer = ()=>  {
        return (
            <Drawer.Navigator
            drawerContent={(props) =>
                <CustomDrawerBar{...props}/>
            }
            >
                <Drawer.Screen name ="Home" component={HomeScreen}/>
                <Drawer.Screen name ="Profile" component={Profile}/>
                <Drawer.Screen name ="Ex4_DetailScreen" component={Ex4_DetailScreen}/>
            </Drawer.Navigator>
        )
    }
    export default MyDrawer;