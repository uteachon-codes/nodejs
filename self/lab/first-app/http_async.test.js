import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import { getActivity } from './http_async';
import axios from 'axios';


jest.mock('axios'); // Mock the axios module

describe('getActivity', () => {
    beforeEach(() => {
        // Create a new mock function for axios.get before each test
        axios.get = jest.fn();
    });

    test('should successfully fetch and return activity data from the API', async () => {
        // Mock axios.get to return a resolved promise with sample data
        const mockData = { data: { title: 'do something' } };
        axios.get.mockResolvedValue(mockData);

        const result = await getActivity();

        expect(result).toEqual(mockData.data);
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
    });

    test('should throw an error if the request fails', async () => {
        // Mock axios.get to return a rejected promise
        const mockError = new Error('Network Error');
        axios.get.mockRejectedValue(mockError);

        await expect(getActivity()).rejects.toThrow('Network Error');
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
    });
});
