import { View, Text, Platform, StyleSheet } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const ios = Platform.OS == 'ios';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ChatHeader() {
    const {top} = useSafeAreaInsets();
    return (

        <View style={styles.header(top)}>
            <Text style={styles.headerText}>Effie Mobile</Text>
    
        {/* user profile picture */}
        <View style={{paddingRight: wp(2)}}>
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
    header: top => ({
        paddingTop: ios? top : top+10,
        paddingBottom: hp(1.5),
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5, // For Android
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    }),
    headerText: {
        fontSize: hp(3),
        color: '#006748',
        fontWeight: 'bold',
        paddingLeft: wp(2),
    },
    userPicture: {
        height: hp(4.3),
        aspectRatio: 1,
        borderRadius: 100,
        // paddingRight: wp(2),
    },
});