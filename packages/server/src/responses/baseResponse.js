class BaseResponse {
  constructor(success, message, data) {
    this.success = success || false;
    this.message = message || null;
    this.data = data || null;
  }
}

export default BaseResponse;
