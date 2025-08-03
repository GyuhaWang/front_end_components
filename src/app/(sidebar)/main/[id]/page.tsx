export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  console.debug("param", param.id);

  // socket으로 통신하는 페이지
  //페이지를 나가면 socket 연결을 끊습니다.
  // 한 번에 몇명을 socket으로 받을 수 있을까?
  return (
    <div>
      <Title prop={param.id} />
    </div>
  );
}

function Title({ prop }: { prop: string }) {
  return (
    <div>
      <input defaultValue={prop}></input>
    </div>
  );
}
