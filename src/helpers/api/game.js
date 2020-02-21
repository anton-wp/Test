import * as axios from 'axios';



export function getLevel () {
  return axios.get(`https://starnavi-frontend-test-task.herokuapp.com/game-settings`)
  .then(response => {
    return response.data;
  })
}
export async function getWinners () {
  const res = await axios.get(`https://starnavi-frontend-test-task.herokuapp.com/winners`);
  return res.data;
  // return 
  // .then(response => {
  //   return response.data;
  // })
}
export async function addWinner (winner, date) {
  const response = await axios.post(`https://starnavi-frontend-test-task.herokuapp.com/winners`, {
      winner: winner,
      date: date
  });

  return response.data;
}