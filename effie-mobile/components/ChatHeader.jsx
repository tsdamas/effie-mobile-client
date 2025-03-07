//import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import ButtonIcon from './ButtonIcon';
import styles from './ChatHeaderStyles';        // Import Styles

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

           
            <View style={styles.userPictureWrapper}>
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
};

/*          Save this part of the code just in case    
            <View style={{ paddingRight: wp(2) }}>
               <Image
                    style={styles.userPicture}
                    source="https://picsum.photos/seed/696/3000/2000"
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={500}
                />
            </View>
            
*/