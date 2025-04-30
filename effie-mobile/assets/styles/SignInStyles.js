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
        fontSize: 30,
        //marginBottom: hp(2),
        marginBottom: hp(3),
        color: Colors.darkGray,
    },
    login_buttons_container: {
        //marginTop: hp(2),
        marginTop: hp(1),
        alignItems: 'center',
        gap: hp(0.1),      // Add space between the buttons
    },
    login_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(4),
        borderRadius: 30,
        backgroundColor: Colors.primaryPurple,
        width: '90%',
        alignSelf: 'center',
        marginTop: hp(1.5),
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, 
        shadowRadius: 3.5,
        elevation: 5,         // For Android
    },
    login_label: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        marginLeft: 3,
        color: 'white',
    },
    already_label: {
        color: '#666',
        fontSize: hp(2),
        textAlign: 'center',
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
        fontSize: hp(2),
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    signin_upContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        gap: wp(1),
        marginTop: hp(3),
        textAlign: 'center',
    },
    logoImage: {
        height: hp(7),
        aspectRatio: 1,
        borderRadius: 100,
        alignSelf: 'center', // Add this
        marginBottom: hp(2), // Optional: spacing below image
    },
    
});

export default styles;
