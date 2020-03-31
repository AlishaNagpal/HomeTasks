import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import styles from './styles'
import { Strings, Images, Colors } from '../../Constants';
import { CustomTextInput } from '../../Components';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { updateValueHome } from '../../Modules/Home/HomeAction';
import FlatListData from './FlatListData';

const apiKey = '&apiKey=d1d4bf49ff254d9ab4efca5f072bc2eb'
const frontPart = 'https://newsapi.org/v2/everything?q='

export interface HomeProps {
  navigation: any,
}

export default function Home(props: HomeProps) {

  const [Search, setSearch] = useState('Noida');
  const [SearchFocus, setSearchFocus] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [TextShown, setTextShown] = useState(-1)
  const [runOnce, setRunOnce] = useState(true);
  const [enable, setEnable] = useState(true);

  const { value } = useSelector((state: { HomeReducer: any }) => ({
    value: state.HomeReducer.value,
  }));
  const dispatch = useDispatch();

  const _updateMasterState = (attrName: any, value: any) => {
    return attrName(value);
  }

  const getFunction = (key: string) => {
    setRunOnce(false)
    axios.get(frontPart + key + apiKey)
      .then(response => {
        const userData1 = response.data.articles;
        setLoader(false)
        // setData(userData1)
        dispatch(updateValueHome(userData1))
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    {
      runOnce &&
      getFunction('Noida')
    }
  });

  const toggleNumberOfLines = (index: number) => {
    setTextShown((TextShown === index) ? -1 : index)
  }

  const renderData = (rowData: any) => {
    const { item, index } = rowData;
    console.log(item)
    return (
      <FlatListData
        index={index}
        item={item}
        toggleNumberOfLines={toggleNumberOfLines}
        TextShown = {TextShown}
      />
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
          otherTextInputProps={{ autoCorrect: false, clearButtonMode: 'while-editing' }}
        />
      </View>
      <ActivityIndicator
        size="large"
        color={Colors.oldSchool}
        style={styles.indicator}
        animating={Loader}
      />
      <FlatList
        data={value}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={renderData}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};
