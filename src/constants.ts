const gitHubApiUrl = 'https://api.github.com/search/repositories?q=';
const gitLabApiUrl = 'https://gitlab.com/api/v4/projects?search=';
const BASIC_TIMEOUT = 3000;
const MONGO_DB_URL = 'mongodb://localhost:27017';
enum RESPONSE_STATUS {
  FAIL = 'fail',
  SUCCESS = 'success',
}

export {
  gitHubApiUrl,
  gitLabApiUrl,
  BASIC_TIMEOUT,
  MONGO_DB_URL,
  RESPONSE_STATUS,
};
