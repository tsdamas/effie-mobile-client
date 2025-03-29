import { View, Text, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import ButtonIcon from './ButtonIcon';
import styles from '../assets/styles/ChatHeaderStyles';        // Import Styles


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

            <Text style={styles.headerText}>Effie</Text>
            <View style={styles.logoWrapper}>
                <Image
                    source={require('../assets/images/effieLogo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

        </View>
    );
};