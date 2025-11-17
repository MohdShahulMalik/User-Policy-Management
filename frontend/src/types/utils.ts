export interface Name {
  first_name: string,
  last_name: string,
}

export interface FormFields {
  name: string,
  label: string,
  type: string,
  options?: string[],
  disabled?: boolean,
};

export interface RecordId {
  tb: string,
  id: {
    String: string,
  }
}
