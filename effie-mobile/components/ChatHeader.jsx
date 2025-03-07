import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import ButtonIcon from './ButtonIcon';

const ios = Platform.OS == 'ios';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  export default function ChatHeader() { 
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    return (
        <View style={styles.header(top)}>
            
            <ButtonIcon 
                onPress={() => navigation.openDrawer()}
                iconName="menu"
                btnSize={28}
                btnColor="black"
                btnStyle={styles.menuButton}
            />
         
            <Text style={styles.headerText}>Effie Mobile</Text>

           
            <View style={{ paddingRight: wp(2) }}>
                <Image
                    style={styles.userPicture}
                    source="https://picsum.photos/seed/696/3000/2000"
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={500}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    header: (top) => ({
        paddingTop: ios ? top : top + 10,
        paddingBottom: hp(1.5),
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
    menuButton: {
        paddingLeft: wp(2),  
        paddingRight: wp(2),
        // marginRight: wp(2), 
    },
    headerText: {
        fontSize: hp(3),
        color: '#006748',
        fontWeight: 'bold',
        flex: 1, 
    },
    userPicture: {
        height: hp(4.3),
        aspectRatio: 1,
        borderRadius: 100,
    },
});