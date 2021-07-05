import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../Reducers/Auth';
import { useUiState } from '../Reducers/Ui';

function Header({ text }) {
  const { uiStore: { showSearch, viewTitle }, uiDispatch } = useUiState();
  const { authStore: { authenticated } } = useAuth();

  const toggleSearchBar = () => {
    uiDispatch({
      type: 'togglesearchbar',
      payload: !showSearch
    })
  }

  return (
    <ImageBackground source={require('../Assets/General/bc_nav_bar.png')} style={{ width: '100%', height: 105 }}>
      <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 35,
          paddingLeft: 10
        }}>
          <View style={{ width: '10%', height: 50 }} >
            {authenticated && <TouchableOpacity>
              <Image source={require('../Assets/NavigationBar/ic_notifications.png')} />
            </TouchableOpacity>}
          </View>
          <View style={{ width: '80%', alignItems: 'center', height: 50 }} >
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{viewTitle || text}</Text>
          </View>
          <View style={{ width: '10%', height: 50 }} >
            {authenticated && <TouchableOpacity
              onPress={toggleSearchBar}
            >
              <Image source={require('../Assets/NavigationBar/ic_search.png')} />
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Header;