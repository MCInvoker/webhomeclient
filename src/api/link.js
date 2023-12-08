import request from "../utils/request"

const addLink = async (data) => {
    const res = await request.post('/api/link', data)
    return res
}

const deleteLink = async (link_id) => {
    const res = await request.delete(`/api/link/${link_id}`)
    return res
}

const getConfig = async () => {
    try {
        const res = await request.get('/config')
        return res
    } catch (error) {
        console.error('请求失败:', error);
        return {
            config: ''
        }
    }
}
// const MyComponent = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await request.get('/path-to-your-api');
//         setData(response);
//       } catch (error) {
//         console.error('请求失败:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return <div>{data ? JSON.stringify(data) : '加载中...'}</div>;
// };

// export default MyComponent;
export {
    addLink,
    deleteLink,
    getConfig,
}