import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator, FlatList, Linking, ImageBackground } from 'react-native';
import styles from './styles'
import { Strings, Images, Colors } from '../../Constants';
import { CustomTextInput } from '../../Components';
import axios from 'axios'

const apiKey = '&apiKey=f9369259f8b04692b061c132b5ad6dea'
const frontPart = 'https://newsapi.org/v2/everything?q='

export interface HomeProps {
  navigation: any,
}

export default function Home(props: HomeProps) {

  const [Search, setSearch] = useState('');
  const [SearchFocus, setSearchFocus] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [Data, setData] = useState([]);
  const [TextShown, setTextShown] = useState(-1)

  const _updateMasterState = (attrName: any, value: any) => {
    return attrName(value);
  }

  const getFunction = (key: string) => {
    axios.get(frontPart + key + apiKey)
      .then(response => {
        console.log(response.data.articles)
        const userData1 = response.data.articles;
        setLoader(false)
        setData(userData1)
      })
      .catch(error => console.log(error));
  }

  const toggleNumberOfLines = (index: number) => {
    setTextShown((TextShown === index) ? -1 : index)
  }

  const renderData = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <View style={styles.flatlistContainer}>
        {/* <Image
          style={styles.imagestyle}
          source={item.urlToImage == null ? Images.placeholderImage : { uri: item.urlToImage }}
        />
        <Text style={styles.dateStyle}>
          Date: {item.publishedAt}
        </Text>
        <Text style={styles.text}> Title : {item.title} </Text>
        <Text
          numberOfLines={TextShown === index ? 0 : 2}
          ellipsizeMode="tail"
          style={styles.text}>
          Description : {item.content} {'\n\n\n'}
          <Text style={styles.text}>
            Link:{'  '}
          </Text>
          <Text
            style={{ color: '#4e4eff', fontWeight: 'normal' }}
            onPress={() => Linking.openURL('http://google.com')} >
            {item.url}
          </Text>
        </Text>

        <TouchableOpacity onPress={() => toggleNumberOfLines(index)} >
          <Text style={styles.buttonTextStyle}>
            {TextShown === index ? 'Go Less' : 'Read More'}
          </Text>
        </TouchableOpacity> */}
      </View>
    )
  }

  return (
    <ImageBackground style={styles.container} source={Images.blurMapBackground}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIconButton} onPress={() => props.navigation.openDrawer()} >
          <Image source={Images.menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.moreSocial} > {Strings.appName} </Text>
        <TouchableOpacity style={styles.searchIconButton} >
          <Image source={Images.searchIcon} />
        </TouchableOpacity>
      </View>
        <View style={[styles.textInput, { borderColor: SearchFocus ? Colors.socialColor : Colors.white }]} >
          <Image source={Images.searchPin} style={styles.searchPin} />
          <CustomTextInput
            value={Search}
            style={styles.searchField}
            attrName={setSearch}
            updateMasterState={_updateMasterState}
            keyboardType={'default'}
            returnKeyType={'done'}
            placeholderStyle={Strings.appTagLine}
            secureTextEntry={false}
            onSubmitEditing={() => { getFunction(Search), setSearchFocus(false) }}
            _handleFocus={() => setSearchFocus(true)}
            _handleBlur={() => setSearchFocus(false)}
            otherTextInputProps={{ autoCorrect: false, clearButtonMode: 'while-editing'}}
          />
        </View>
        <ActivityIndicator
          size="large"
          color={Colors.oldSchool}
          style={styles.indicator}
          animating={Loader}
        />
        <FlatList
          data={Data}
          keyExtractor={(item: any, index: number) => index.toString()}
          renderItem={renderData}
          showsVerticalScrollIndicator={false}
        />
    </ImageBackground>
  );
};
