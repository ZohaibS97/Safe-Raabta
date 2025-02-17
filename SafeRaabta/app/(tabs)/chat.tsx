import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, Image, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleBackPress = () => {
      if (chatVisible) {
        setChatVisible(false);
        return true;
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [chatVisible]);

  const openChat = (friend: React.SetStateAction<null>) => {
    setSelectedChat(friend);
  };

  const closeChat = () => {
    setSelectedChat(null);
  };

  const filteredFriends = friends
    .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={{ flex: 1, backgroundColor: '#e0f7e9', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home Page</Text>

      <TouchableOpacity
        style={{ position: 'absolute', bottom: 50, right: 20 }}
        onPress={() => setChatVisible(true)}
      >
        <FontAwesome5 name="comments" size={30} color="black" />
      </TouchableOpacity>

      <Modal visible={chatVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
          {selectedChat ? (
            <>
              <TouchableOpacity onPress={closeChat}>
                <Text style={{ fontSize: 18, color: 'blue' }}>← Back</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{selectedChat.name}</Text>
              {/* Chat messages will be displayed here */}
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setChatVisible(false)}>
                <Text style={{ fontSize: 18, color: 'blue' }}>← Close</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Friends</Text>
              {onlineFriends.length > 0 && (
                <FlatList
                  horizontal
                  data={onlineFriends}
                  renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', marginRight: 10 }}>
                      <Image source={{ uri: item.profilePic }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                      <Text>{item.name}</Text>
                      <View style={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: 5, position: 'absolute', right: 0, top: 0 }} />
                    </View>
                  )}
                />
              )}
              <TextInput
                style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
                placeholder="Search friend..."
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
              <FlatList
                data={filteredFriends}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => openChat(item)}>
                    <Text style={{ fontSize: 18, padding: 10 }}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <Text style={{ fontSize: 16, color: 'gray' }}>You don't have friends in the list, go to your profile to add friends.</Text>
                )}
              />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
