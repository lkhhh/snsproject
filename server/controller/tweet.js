
import * as tweetRepoitory from '../data/tweet.js'
//동기적 처리해야하니 추후 async처리
export async function getTweets(req,res){
    const username=req.query.username;
    const data=await (username 
        ? tweetRepoitory.getAllByUsername(username)
        :tweetRepoitory.getAll());
    res.status(200).json(data);
}
export async function getTweet(req,res){
    const id=req.params.id;
    const tweet=await tweetRepoitory.getById(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message:`Tweet id:${id} not found`});
    }
}

export async function createTweet(req, res, next) {
    const { text } = req.body;
    const tweet = await tweetRepository.create(text, req.userId);
    res.status(201).json(tweet);
  }

  export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
      return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if (tweet.userId !== req.userId) {
      return res.sendStatus(403);
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
  }

export async function deleteTweet(req,res){
    const id=req.params.id;
    const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
    tweetRepoitory.remove(id)
    res.sendStatus(204);
}