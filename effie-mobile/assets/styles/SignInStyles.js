import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/assets/styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        justifyContent: 'center',
        marginHorizontal: 'auto',
        width: Platform.OS !== 'web' ? '100%' : 'auto',
        backgroundColor: Colors.lightGray,
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 36,
        marginBottom: hp(2),
        color: Colors.darkGray,
    },
    login_buttons_container: {
        marginTop: hp(2),
        alignItems: 'center',
    },
    login_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5),
        borderRadius: 50,
        backgroundColor: Colors.primaryPurple,
        alignSelf: 'stretch',
        marginTop: hp(2),
    },
    login_label: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        marginLeft: 3,
        color: 'white',
    },
    already_label: {
        color: 'gray',
        fontSize: hp(1.8)
    },
    inputContainer: {
        width: '100%',
        marginTop: hp(2),
    },
    forgotButton: {
        marginTop: hp(2),
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginHorizontal: wp(5),
        marginBottom: hp(2),
    },
    backToLoginButton: {
        marginTop: hp(2),
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: hp(1),
        textAlign: 'center',
    },
    importantText: {
        color: Colors.primaryPurple,
        textDecorationLine: 'underline',
        fontSize: hp(1.8),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    signin_upContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        gap: wp(1),
        marginTop: hp(3),
        textAlign: 'center',
    }
});

export default styles;
