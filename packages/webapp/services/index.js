import { get, CancelToken } from 'axios'

/*
 * Request cancellation setup.
 * See: https://github.com/axios/axios#cancellation
 */
const CancelSource = CancelToken.source()

/**
 * The Address book.
 */
const Address = {
  auth: 'http://api.example.org',
  show: 'https://api.tvmaze.com',
}

const { auth, show } = Address

const Service = {
  show: {
    async getShowByName(name) {
      try {
        return await get(`${show}/search/shows/?q=${name}`)
      } catch ({ message }) {
        throw new Error(`Failed to request for show name ${name}: ${message}`)
      }
    },
    async getShowById(id) {
      try {
        return await get(`${show}/shows/${id}`)
      } catch ({ message }) {
        throw new Error(`Failed to request for show id ${id}: ${message}`)
      }
    },
  },
  /**
   * Testing different functions and custom requests.
   */
  test: {
    /*
     * Returns authentication token, that should be included into
     * 'Authorization' HTTP header for further requests to other services.
     */
    async auth() {
      try {
        return await get(`${auth}/v1/api/auth`)
      } catch ({ message }) {
        throw new Error(`Failed to get auth key: ${message}`)
      }
    },
    async test(url, defaultConfig) {
      /**
       * Example of a config for cancelable request.
       */
      const config = { ...defaultConfig, cancelToken: CancelSource.token }

      try {
        return await get(url, config)
      } catch (error) {
        /**
         * Custom Error handling.
         */
        if (error.response) {
          throw new Error(`Status code out of valid range: ${error.message}`)
        } else if (error.request) {
          throw new Error('The request was made, but no response was received.')
        } else {
          throw new Error(`Request triggered an Error: ${error.message}`)
        }
      }
    },
  },
}

export default Service
