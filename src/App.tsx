import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState<string[]>(new Array(9).fill('empty'));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty'));
  };

  const checkIsWinner = (state: string[]) => {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (state[a] !== 'empty' && state[a] === state[b] && state[a] === state[c]) {
        setGameWinner(`${state[a]} won the game! 🥳`);
        return true;
      }
    }

    if (!state.includes('empty')) {
      setGameWinner('Draw game... ⌛️');
      return true;
    }

    return false;
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      });
      return;
    }

    if (gameState[itemNumber] === 'empty') {
      const newGameState = [...gameState];
      newGameState[itemNumber] = isCross ? 'cross' : 'circle';
      setGameState(newGameState);

      if (!checkIsWinner(newGameState)) {
        setIsCross(!isCross);
      }
    } else {
      Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
    marginBottom: 50,
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
