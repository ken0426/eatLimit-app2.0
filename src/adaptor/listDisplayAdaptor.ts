import { PostData } from '../types';

export const listDisplayAdaptor = (postData: PostData[], id: string) => {
  return postData.length
    ? [
        {
          id,
          image: postData.find((item) => item.key === 'image')?.value as string,
          eatName: postData.find((item) => item.key === 'product')!
            .value as string,
          count: Number(
            postData.find((item) => item.key === 'quantity')!.value
          ),
          date: postData.find((item) => item.key === 'date')!.value as string,
          management: postData.find((item) => item.key === 'management')!
            .value as '消費期限' | '賞味期限' | '購入日' | '登録日',
          preservation: postData.find((item) => item.key === 'preservation')!
            .value as '冷凍' | '冷蔵' | '常温',
          registerDate: postData.find((item) => item.key === 'registerDate')!
            .value as string,
          approximateDeadline: postData.find(
            (item) => item.key === 'approximateDeadline'
          )?.value as string,
          memo: postData.find((item) => item.key === 'memo')?.value as string,
          tagData: postData.find((item) => item.key === 'tag')?.value.length
            ? (postData.find((item) => item.key === 'tag')!.value as {
                id: string;
                name: string;
              }[])
            : [],
          imageId: postData.find((item) => item.key === 'imageId')
            ?.value as string,
        },
      ]
    : [];
};
