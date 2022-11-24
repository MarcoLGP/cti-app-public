import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ficha from '../pages/Ficha';
import Listeners from '../pages/Listeners'
import Config from '../pages/Config';
import Info from '../pages/Info';
import Home from '../pages/Home';
import Login from '../pages/Login';
import InfoEncontrarEstoque from '../pages/InfoEncontrarEstoque';
import VendaPage from '../pages/vendaPage';
import MenuPage from '../pages/Menu';
import InfoRegistrarEstoque from '../pages/InfoRegistrarEstoque';
import { useDispatch, useSelector } from 'react-redux';
import { setInVenda, setOnlyOne } from '../redux/infoSlice';
import NotaPage from '../pages/NotaPage';
import CameraPage from '../pages/CameraPage';
import VendaNotaInfo from '../pages/vendaNotaInfo';

StatusBar.setBarStyle('dark-content');
export default function Pages() {

  const [openCamera, setOpenCamera] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(false)
  const [openModalEstoque, setOpenModalEstoque] = React.useState(false)
  const [hideMenu, setHideMenu] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const { inVenda } = useSelector(state => state.clientId)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    btnCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#342B49',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 1,
      bottom: openCamera ? 18 : 28
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: '#48CEF6'
    },
    img: {
      width: 30,
      height: 30,
    }
  });

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title2':
        routeName === selectedTab ? icon = 'document-text' : icon = 'document-text-outline';
        break;
      case 'title4':
        routeName === selectedTab ? icon = 'person' : icon = 'person-outline';
        break;
    }

    return (
      <Ionicons name={icon} size={23} color='white' />
    );
  };

  return (
    <View style={styles.container}>
      <CurvedBottomBar.Navigator
        height={60}
        circleWidth={55}
        bgColor="#342B49"
        style={{
          display: hideMenu ? 'none' : 'flex'
        }}
        borderTopLeftRight
        type={!openCamera ? 'down' : 'up'}
        initialRouteName="title7"
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View
            style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              {!inVenda ? <Ionicons name={openCamera ? "qr-code" : "qr-code-outline"} onPress={() => navigate('title13')} size={28} color='white' /> :
                <MaterialIcons name='cart-plus' size={28} onPress={() => {
                  navigate('title5')
                  setHideMenu(true)
                  dispatch(setOnlyOne(false))
                }} color='white' />}
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={({ routeName, selectedTab, navigate }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setInVenda(false))
                navigate(routeName)
              }}
              style={{ justifyContent: 'center', alignItems: 'center'}}>
              {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
          );
        }}>
        <CurvedBottomBar.Screen
          name='title7'
          component={({ navigate }) => <Home navigate={navigate} />}
        />
        <CurvedBottomBar.Screen
          name='title8'
          component={({ navigate }) => <Login setIsLogin={setIsLogin} navigate={navigate} setHideMenu={setHideMenu} loading={loading} setLoading={setLoading} />}
        />
        <CurvedBottomBar.Screen
          name="title5"
          component={({ navigate }) => <CameraPage setOpenModalEstoque={setOpenModalEstoque} navigate={navigate} setOpenCamera={setOpenCamera} setHideMenu={setHideMenu} />}
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={({ navigate }) => <Ficha navigate={navigate} setHideMenu={setHideMenu} />}
          position='left'
        />
        <CurvedBottomBar.Screen
          name="title3"
          component={() => isLogin ? <Listeners setLoading={setLoading} setHideMenu={setHideMenu} /> : null}
        />
        <CurvedBottomBar.Screen
          name="title4"
          component={({ navigate }) => <Config navigate={navigate} setHideMenu={setHideMenu} />}
          position='right'
        />
        <CurvedBottomBar.Screen
          name="title6"
          component={({ navigate }) => <Info setOpenCamera={setOpenCamera} navigate={navigate} setHideMenu={setHideMenu} />}
        />
        <CurvedBottomBar.Screen
          name="title9"
          component={({ navigate }) => <VendaNotaInfo setOpenCamera={setOpenCamera} navigate={navigate} setHideMenu={setHideMenu} />}
        />
        <CurvedBottomBar.Screen
          name="title10"
          component={({ navigate }) => <InfoEncontrarEstoque navigate={navigate} setHideMenu={setHideMenu} setOpenCamera={setOpenCamera} />}
        />
        <CurvedBottomBar.Screen
          name="title1"
          component={({ navigate }) => <NotaPage navigate={navigate} setHideMenu={setHideMenu} setOpenCamera={setOpenCamera} />}
        />
        <CurvedBottomBar.Screen
          name="title12"
          component={({ navigate }) => <VendaPage navigate={navigate} setHideMenu={setHideMenu} setOpenCamera={setOpenCamera} />}
        />
        <CurvedBottomBar.Screen
          name="title13"
          component={({ navigate }) => isLogin ? <MenuPage navigate={navigate} setLoading={setLoading} setHideMenu={setHideMenu} setOpenCamera={setOpenCamera} /> : null}
        />
        <CurvedBottomBar.Screen
          name="title14"
          component={({ navigate }) => <InfoRegistrarEstoque openModalEstoque={openModalEstoque} setOpenModalEstoque={setOpenModalEstoque} navigate={navigate} setHideMenu={setHideMenu} setOpenCamera={setOpenCamera} />}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};