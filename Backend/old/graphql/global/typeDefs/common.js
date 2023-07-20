import { gql } from 'apollo-server-express';

const common = gql`
    type Address {
        id: ID
        name: String
    }
    interface MutationOf {
        "Mutation status"
        success: Boolean
        "Mutation message"
        msg: String
    }
    type Paginator {
        "Có trang tiếp theo"
        hasNextpage: Boolean
        "Có trang trước"
        hasPrepage: Boolean
        "Stt bài đăng đầu tiên mỗi trang"
        slNo: Int
        "Trang trước"
        pre: Int
        "Trang tiếp theo"
        next: Int
        "Số bài mỗi trang"
        perPage: Int
        "Tổng số bài đăng"
        # totalPosts: Int
        totalDocs: Int
        "Tổng số trang"
        totalPages: Int
        "Số trang hiện tại"
        currentPage: Int
    }
    type Coordinates {
        lat: String
        long: String
    }
    type Shop {
        _id: ID
        coordinates: Coordinates
    }
`;

export default common;
