export interface Name {
  first_name: string,
  last_name: string,
}

export interface FormFields {
  label: string,
  type: string,
  options?: string[],
};

export interface RecordId {
  tb: string,
  id: {
    String: string,
  }
}
