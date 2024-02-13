type RequestName =
  | 'consent'
  | 'list'
  | 'groups'
  | 'conversation_messages'
  | 'conversation_consent'
  | 'group_sync'
  | 'group_messages'
  | 'all_messages_list'
  | 'group_members';

interface LoggerOptions {
  name: RequestName;
}

export async function withRequestLogger<T>(
  request: Promise<T>,
  options?: LoggerOptions,
) {
  let start;
  if (__DEV__) {
    start = Date.now();
    console.log(`REQUEST_LOGGER: Requesting ${options?.name}`, start);
  }
  const data = await request;

  if (__DEV__ && start) {
    const end = Date.now();
    console.log(
      `REQUEST_LOGGER: Response ${options?.name}`,
      end,
      `Elapsed: ${end - start}ms`,
    );
  }
  return data;
}
