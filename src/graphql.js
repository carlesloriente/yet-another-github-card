// src/graphql.js

/**
 * Description TODO
 * @constant
 */
export const USERCARD = `
query getMyUsercard($login: String!) {
  user(login: $login) {
    createdAt
    id
    login
    url
    name
    bio
    avatarUrl
    location
    status {
      message
    }
    websiteUrl
    isGitHubStar
    isHireable
    socialAccounts (first: 10) {
      nodes {
        displayName
        provider
        url
      }
    }
    starredRepositories (first: 10) {
      totalCount
    }
    sponsors (first: 10) {
      totalCount
    }
  }
}
`

/**
 * Description TODO
 * @constant
 */
export const STARS = `
query getMyStars($login: String!) {
  user(login: $login) {
    repositories (first: 50, isFork: false, privacy: PUBLIC) {
      totalCount
      nodes {
        stargazerCount
      }
    }
  }
}
`

/**
 * Description TODO
 * @constant
 */
export const GIST_STARS = `
query getMyGistsStars() {
	viewer {
    gists(first: 100, privacy: PUBLIC, orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        stargazerCount
      }
    }
  }
}
`

/**
 * Description TODO
 * @constant
 */
export const FOLLOWERS = `
query getMyFollowers($login: String!) {
  user(login: $login) {
    followers {
      totalCount
    }
  }
}
`

/**
 * Description TODO
 * @constant
 */
export const FOLLOWING = `
query getMyFollows($login: String!) {
  user(login: $login) {
    following {
      totalCount
    }
  }
}
`


/**
 * Description TODO
 * @constant
 */
export const COMMITS = `
query getMyCommits($login: String!) {
  user(login: $login) {
    repositories(first: 20, orderBy: {field: NAME, direction: ASC}) {
      nodes {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 10, author: {id: "MDQ6VXNlcjcxOTc3MzM"}) {
                totalCount
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
      }
    }
  }
}
`

/**
 * Description TODO.
 * @constant
 */
export const CONTRIBUTIONS = `
query getMyContributions($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
      }
    }
  }
}
`

/**
 * Description TODO
 * @constant
 */
export const PRS = `
query getMyPrs($login: String!) {
  user(login: $login) {
    pullRequests(first: 100, states: CLOSED) {
      totalCount
    }
  }
}
`
