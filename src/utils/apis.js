import axios from 'axios';
import { BASE_API_URL } from './constants';
const storyUrl = `${BASE_API_URL}/item/`;

export const getStory = async (storyId) => {
  let {id} = storyId
  // console.log(storyId, id)
  try {
    const story = await axios.get(`${storyUrl}${id}`);
    // console.log(story)
    return story;
  } catch (error) {
    console.log('Error while getting a story.');
  }
 
};

export const getStories = async (type) => {
  try {
    const { data: storyIds } = await axios.get(
      `${BASE_API_URL}/${type}`
    );
    const stories = await Promise.all(storyIds.map(getStory));
    console.log(stories)
    return stories;
  } catch (error) {
    console.log('Error while getting list of stories.');
  }
};