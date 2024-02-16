import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import colors from '../colors';
import { LayoutComponentProps } from '../types';


const Layout = (props: LayoutComponentProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.bodyColor
    },
    contentContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: colors.menuBackground,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    menuText: {
        color: colors.menuText,
        fontSize: 20
    },
    menuBtnText: {
        fontSize: 14
    }
});


export default Layout;