import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
  Image,
  BackHandler,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [chatVisible, setChatVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const handleBackPress = () => {
      if (chatVisible) {
        if (selectedChat) {
          setSelectedChat(null);
        } else {
          setChatVisible(false);
        }
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [chatVisible, selectedChat]);

  const openChat = (friend: React.SetStateAction<null>) => {
    setSelectedChat(friend);
  };

  const closeChat = () => {
    setSelectedChat(null);
  };

  const filteredFriends = friends
    .filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      {/* Content Box */}
      <View style={styles.contentBox}>
        <Text style={styles.title}>Home Page</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('./storyUpload')}
        >
          <Feather name="camera" size={24} color="#524A72" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('./home')}
        >
          <Feather name="home" size={24} color="#524A72" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setChatVisible(true)}
        >
          <Feather name="message-circle" size={24} color="#524A72" />
        </TouchableOpacity>
      </View>

      {/* Chat Modal */}
      <Modal visible={chatVisible} animationType="slide">
        <View style={styles.chatContainer}>
          {selectedChat ? (
            <>
              <TouchableOpacity onPress={closeChat}>
                <Text style={styles.backButton}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.chatTitle}>{selectedChat.name}</Text>
              {/* Chat messages will be displayed here */}
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setChatVisible(false)}>
                <Text style={styles.backButton}>← Close</Text>
              </TouchableOpacity>
              <Text style={styles.chatTitle}>Friends</Text>
              {onlineFriends.length > 0 && (
                <FlatList
                  horizontal
                  data={onlineFriends}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.onlineFriend}>
                      <Image
                        source={{ uri: item.profilePic }}
                        style={styles.profilePic}
                      />
                      <Text>{item.name}</Text>
                      <View style={styles.onlineIndicator} />
                    </View>
                  )}
                  style={styles.onlineFriendsList}
                />
              )}
              <TextInput
                style={styles.searchBar}
                placeholder="Search friend..."
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
              <FlatList
                data={filteredFriends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => openChat(item)}>
                    <Text style={styles.friendItem}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <Text style={styles.noFriendsText}>
                    You don't have friends in the list, go to your profile to
                    add friends.
                  </Text>
                )}
              />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7e9',
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 18,
    color: 'blue',
  },
  chatTitle: {

::contentReference[oaicite:0]{index=0}
 
