export type FrameButton =
  | {
      action: 'link' | 'mint';
      target: string;
      label: string;
      postUrl: never;
    }
  | {
      action: 'post' | 'post_redirect';
      target?: string;
      label: string;
      postUrl?: string;
    }
  | {
      action: 'tx';
      target: string;
      label: string;
      postUrl: string;
    };
