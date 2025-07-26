export default function Page({ params }: { params: { id: string } }) {
  console.debug("param", params.id);

  // socket으로 통신하는 페이지
  //페이지를 나가면 socket 연결을 끊습니다.
  // 한 번에 몇명을 socket으로 받을 수 있을까?
  return <div>hello {params.id}</div>;
}
